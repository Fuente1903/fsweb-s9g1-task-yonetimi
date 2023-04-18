import React from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      people: [],
    },
  });

  const onSubmit = (data) => {
    submitFn({ ...data, id: nanoid(5), status: 'yapılacak' });
  };

  console.log(errors);

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register('title', {
            required: 'Task başlığı yazmalısınız',
            minLength: {
              value: 3,
              message: 'Task başlığı en az 3 karakter olmalı',
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register('description', {
            required: 'Task açıklaması yazmalısınız',
            minLength: {
              value: 10,
              message: 'Task açıklaması en az 10 karakter olmalı',
            },
          })}
        />
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register('people', {
                  required: 'Lütfen en az bir kişi seçin',
                  validate: {
                    upperLimit: (peop) =>
                      peop.length <= 3 || 'En fazla 3 kişi seçebilirsiniz',
                  },
                })}
              />
              {p}
            </label>
          ))}
          {errors.people && (
            <p className="input-error">{errors.people.message}</p>
          )}
        </div>
      </div>

      <div className="form-line">
        <input type="submit" disabled={!isValid} />
      </div>
    </form>
  );
}