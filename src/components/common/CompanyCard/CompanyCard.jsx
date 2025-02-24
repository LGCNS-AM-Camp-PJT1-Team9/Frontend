import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyCard.css';

// Card Component
const Card = ({ name, isSelected, onClick }) => {
  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

// SelectableCardList Component
const SelectableCardList = ({ data }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (name) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name]
    );
  };

  return (
    <div className="card-container-wrapper">
      <div className="card-container">
        {data.map((name, index) => (
          <Card
            key={index}
            name={name}
            isSelected={selectedCards.includes(name)}
            onClick={() => handleCardClick(name)}
          />
        ))}
        <div className="selected-list">
          <h3>선택된 카드:</h3>
          {selectedCards.length > 0 ? (
            <ul>
              {selectedCards.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          ) : (
            <p>선택된 카드가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// CardListWithNavigation Component
const CardListWithNavigation = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/details/${name}`);
  };

  return (
    <div className='card-container-wrapper'>
      <div className="card-container">
        {data.map((name, index) => (
          <Card
            key={index}
            name={name}
            isSelected={false}
            onClick={() => handleCardClick(name)}
          />
        ))}
      </div>
    </div>
  );
};

const CompanyCard = { Card, SelectableCardList, CardListWithNavigation };
export default CompanyCard;
