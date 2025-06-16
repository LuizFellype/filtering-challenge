import { useCallback } from "react";
import useProducts from "./useProducts";
import useRecommendations from "./useRecommendations";

const useFilteringManager = () => {
    const { preferences, features, products } = useProducts();
    const { getRecommendations, recommendations, setRecommendations } = useRecommendations(products);

    const handleFormSubmit = useCallback((formData) => {
        const dataRecommendations = getRecommendations(formData);
        setRecommendations(dataRecommendations);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    return {
        preferences,
        features,
        recommendations,
        handleFormSubmit,
    }
}
export default useFilteringManager;