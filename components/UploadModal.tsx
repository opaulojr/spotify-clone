'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

function UploadModal() {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const uploadFile = async (
    file: File,
    folder: string,
    fileNamePrefix: string,
  ): Promise<any> => {
    try {
      const uniqueID = uniqid();
      const result = await supabaseClient.storage.from(folder).upload(
        `${fileNamePrefix}-${uniqueID}`,
        file,
        {
          cacheControl: '3600',
          upsert: false,
        },
      );
      return result.data?.path;
    } catch (error: any) {
      throw new Error(`Failed to upload ${folder.slice(0, -1)}: ${error.message}`);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      const songData = await uploadFile(songFile, 'songs', `song-${values.title}-${uniqueID}`);
      const imageData = await uploadFile(imageFile, 'images', `image-${values.title}-${uniqueID}`);

      await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        song_path: songData,
        image_path: imageData,
      });

      setIsLoading(false);
      router.refresh();
      toast.success('Song Created!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Error creating song');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload a mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;
