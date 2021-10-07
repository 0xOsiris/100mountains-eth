import { ReactVideo } from 'reactjs-media'
import React, { useState } from "react";
export default function VideoPlayer (props) {
    return (
        
            <ReactVideo
                src={props.src}
                poster={props.poster}
                
            />
        
    );
}