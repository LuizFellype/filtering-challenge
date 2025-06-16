// getRecommendations.js
const toHashMap = (arr) => {
  return arr.reduce((acc, item) => {
    return { ...acc, [item]: true }
  }, {})
}

/**
 * 
 * @param {
 *  selectedFeatures: string[], 
 *  selectedPreferences: string[], 
 *  selectedRecommendationType: 'MultipleProducts' | 'SingleProduct'
 * } formData 
 * @param {
 *  {
  *  features: stirng[],  
  *  selectedPreferences: string[], 
  *  [k: string]: any 
 *  }[]
 * } products 
 * @returns product[] 
 * 
 * Should filter products by selected preferences and selectedRecommendationType
 * return only one product if SingleProduct
 * return last product if SingleProduct but multiple product were found
 * otherwise, return all filtered products
 */
const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' },
  products
) => {
  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType } = formData

  const mappedPreferences = toHashMap(selectedPreferences)
  const mappedFeatures = toHashMap(selectedFeatures)

  const { byPreferences } = products.reduce(({ byFeatures, byPreferences }, product) => {
    const isPreferenceIncluded = product.preferences.some(feature => {
      return mappedPreferences[feature]
    })

    const isFeatureIncluded = product.features.some(feature => {
      return mappedFeatures[feature]
    })

    if (isPreferenceIncluded) { byPreferences.push(product) }
    if (isFeatureIncluded) { byFeatures.push(product) }

    return {
      byFeatures,
      byPreferences,
    }
  }, { byPreferences: [], byFeatures: [] })


  if (selectedRecommendationType === 'SingleProduct') {
    const hasMultipleMatches = byPreferences.length > 1

    return hasMultipleMatches ?
      [byPreferences[byPreferences.length - 1]] :
      byPreferences.slice(0, 1)
  }

  return byPreferences
};

export default { getRecommendations };
