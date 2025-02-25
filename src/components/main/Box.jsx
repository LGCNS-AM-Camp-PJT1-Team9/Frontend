import React from 'react';
import { Link } from 'react-router-dom';
import './Box.css'; // Box 전용 스타일을 분리했다면 여기에 작성

const Box = ({ link, image, title, description, width }) => (
    <Link to={link} className="box-link" style={{ width: width || '' }}>
        <div className="box">
            <div className="box_image_container">
                <img src={image} alt={title} className="box-image" />
            </div>
            <h2 className="box-title">{title}</h2>
            <p className="box-description">{description}</p>
        </div>
    </Link>
);

export default Box;