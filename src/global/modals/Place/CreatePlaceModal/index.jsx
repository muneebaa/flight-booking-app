import React from 'react';
import { Button } from 'global/components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createPlace } from 'services/places/index';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from 'store/features/alertSlice';
import './style.css';

function CreatePlaceModal({ setCreatePlaceModal }) {
  const dispatch = useDispatch();

  const handleClick = async (place) => {
    const formData = new FormData();
    formData.append('country', place.country);
    formData.append('city', place.city);
    formData.append('description', place.description);
    formData.append('image', place.image);
    console.log(formData);

    let response = await createPlace(formData);

    console.log(response);
    if (response.status === 201) {
      dispatch(
        showAlert({
          message: 'Place Created Successfully',
          type: 'success',
        })
      );
      setCreatePlaceModal(false);
    }
  };

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      country: '',
      city: '',
      description: '',
      image: '',
    },
    validationSchema: yup.object().shape({
      country: yup
        .string()
        .min(3, 'Cannot be less than 3 characters')
        .required('Country name is required'),
      city: yup
        .string()
        .min(3, 'Cannot be less than 3 characters')
        .required('City name is required'),
      description: yup
        .string()
        .min(3, 'Cannot be less than 5 characters')
        .required('Description is required'),
      image: yup.mixed().nullable().required('Branch Image is Required'),
      //   .test(
      //     'FILE_SIZE',
      //     'Uploaded File is too big',
      //     (value) => !value || (value && value.size <= 1024 * 1024)
      //   )
      //   .test(
      //     'FILE_FORMAT',
      //     'Uploaded file has unsupported format',
      //     (value) =>
      //       !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      //   ),
    }),
    onSubmit: (values) => {
      handleClick(values);
    },
  });
  return (
    <div>
      <h2 className='main-span'>Create Place</h2>
      <div className='create-place-inputs-main'>
        <div className='flex'>
          <div className='inner-input '>
            <p>Country</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='Country'
                name='country'
                value={values.country}
                onChange={handleChange('country')}
                onBlur={handleBlur}
              />
              {errors.country && touched.country ? (
                <div>
                  <p className='error'>{errors.country}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className='inner-input  m-left'>
            <p>City</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='City'
                name='city'
                value={values.city}
                onChange={handleChange('city')}
                onBlur={handleBlur}
              />
              {errors.city && touched.city ? (
                <div>
                  <p className='error'>{errors.city}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='inner-input'>
            <p>Description</p>
            <div className='input-single'>
              <input
                type='text'
                placeholder='Description'
                name='description'
                value={values.description}
                onChange={handleChange('description')}
                onBlur={handleBlur}
              />
              {errors.description && touched.description ? (
                <div>
                  <p className='error'>{errors.description}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className='inner-input  m-left'>
            <p>Image</p>
            <div className='input-single'>
              <input
                type='file'
                name='image'
                onChange={(e) =>
                  setFieldValue('image', e.currentTarget.files[0])
                }
                onBlur={handleBlur}
              />
              {errors.image && touched.image ? (
                <div>
                  <p className='error'>{errors.image}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='create-place-button'>
          <Button value='Create' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default CreatePlaceModal;
