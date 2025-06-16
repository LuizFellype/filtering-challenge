import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { recommendationTypes } from '../../../services/recommendation.service';

function RecommendationType({ onRecommendationTypeChange, selected }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          onChange={() => onRecommendationTypeChange(recommendationTypes.SingleProduct)}
          className="mr-2"
          checked={selected === recommendationTypes.SingleProduct}
          />
        <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          onChange={() => onRecommendationTypeChange(recommendationTypes.MultipleProducts)}
          className="mr-2"
          checked={selected === recommendationTypes.MultipleProducts}
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
