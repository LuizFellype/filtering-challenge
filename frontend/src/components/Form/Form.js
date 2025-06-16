// Form.js

import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useForm from '../../hooks/useForm';

function Form({ onSubmit, preferences, features }) {
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData)
  };

  return (
    <form
      className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className='md:flex md:justify-between md:gap-4'>
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
      </div>

      <div className='flex flex-col md:flex-row md:justify-between items-center md:gap-4'>
        <RecommendationType
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
        <SubmitButton text="Obter recomendação" />
      </div>
    </form>
  );
}

export default React.memo(Form);
