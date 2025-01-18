import React from 'react';
import s from './BabysitterGridItemStyle.module.css';
import { useNavigate } from 'react-router-dom';
import trollProf from '../../../Assets/Pictures/troll_prof.jpg';
import xIcon from '../../../Assets/Icons/X-icon.png';

const BabysitterGridItem = ({ babysitter, onDelete, onNavigate }) => {

  const navigate = useNavigate();
  
  const handleDelete = () => {
    onDelete(babysitter?.id);
  };
  
  const handleNavigate = () => {
    onNavigate();
    navigate(`../babysitter-details/${babysitter.id}`, {path: '..'});
  };

  return (
    <div className={s.babysitter_grid_item_container}>
      <img
        src={xIcon}
        className={s.babysitter_grid_item_delete_button}
        onClick={handleDelete}
      />
      <a
        href={`../babysitter-details/${babysitter.id}`}
      >
        <img
          src={trollProf}
          className={s.babysitter_grid_item_avatar}
          onClick={handleNavigate}
        />
      </a>
      <p>{babysitter.name ?? 'Ονοματεπώνυμο Νταντάς'}</p>
    </div>
  );
}
 
export default BabysitterGridItem;