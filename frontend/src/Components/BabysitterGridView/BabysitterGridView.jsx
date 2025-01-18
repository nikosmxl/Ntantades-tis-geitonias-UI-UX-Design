import React from 'react';
import s from './BabysitterGridViewStyle.module.css';
import BabysitterGridItem from './BabysitterGridItem/BabysitterGridItem';

const BabysitterGridView = ({ babysitters, onBabysitterDelete, onNavigate }) => {
  return (

    <div className={s.grid_view}>
      {
        babysitters.map((babysitter, index) => {
          return (
            <BabysitterGridItem
              key={`${babysitter.id} ${index}`}
              babysitter={babysitter}
              onDelete={onBabysitterDelete}
              onNavigate={onNavigate}
            />
          )
        })
      }
    </div>
  );
}
 
export default BabysitterGridView;