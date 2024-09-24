import { Blog, BlogFormFields, BlogFormProp } from "./blogTypes"
import { useForm, SubmitHandler, Resolver, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from "react";

const schema = yup.object({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    body: yup.string().required('Body is required').min(10, 'Body must be at least 10 characters'),
  }).required();
  const defaultValues = {
    id: '',
    title: '',
    body: ''
  }
const resolver: Resolver<BlogFormFields> = yupResolver(schema);


const BlogForm: React.FC<BlogFormProp> = ({save, blog, saving, onCancel}):JSX.Element => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<BlogFormFields>({
        resolver, 
        mode: 'onBlur',
      });
      useEffect(() => {
        if (blog) {
          Object.keys(blog).forEach(key => {
            if (Object.keys(defaultValues).includes(key)) {
              setValue(key as keyof BlogFormFields, blog[key as keyof BlogFormFields] as string)
            }
          })
        }
      }, [blog])
      const onSubmit: SubmitHandler<BlogFormFields|Blog> = (data) => {
        save(data)
      };
    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 px-3 py-2 border shadow-sm border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                  />
                )}
                />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
            <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700">
                Body
            </label>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <textarea
                {...field}
                className="mt-1 px-3 py-2 border shadow-sm border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter body content"
              />
              )}
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
            )}
            </div>


            <div className="flex justify-end gap-2 items-center">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>

        </form>
}

export default BlogForm