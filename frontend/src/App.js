import React from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useFilteringManager from './hooks/useFilterManager';

function App() {
  const { features, preferences, recommendations, handleFormSubmit } = useFilteringManager()

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 px-4 text-center">Recomendador de Produtos RD Station</h1>
      <div className="mb-4 flex justify-center">
        <p className="text-lg px-4 w-full md:w-2/3 text-justify">
          Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full flex flex-col justify-center md:flex-row gap-8">
        <div>
          <Form
            onSubmit={handleFormSubmit}
            preferences={preferences}
            features={features}
          />
        </div>
        <div>
          <RecommendationList recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}

export default App;
