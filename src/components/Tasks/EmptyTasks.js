import React from 'react';
import './emptyTasks.scss';

const EmptyTasks = ({text}) => {
    return (
        <div className="container">
            <div className="bunny-container">
                <div className="bunny-left">
                    <img src="https://bunnystudio.com/static/images/bunny-studio-icon.png" alt=""/>
                </div>
                <div className="bunny-right">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default EmptyTasks;