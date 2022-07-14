import FileUploader from "./FileUploader/FileUploader"
import LabelList from './LabelList/LabelList.js';
import './TitleArea.scss';
import React, {useState} from 'react';

function TitleArea({img}){
const [isSubmitted, setisSubmitted] = useState(false);
const [labels, setLabels] = useState({});
const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="titleAreaContainer">
            {isSubmitted ? (
                <LabelList labels={labels}/>
            ):(
                <div className="titleArea">
                    <img className="title" src={img}/>
                </div>
            )}

            <div className="uploadArea">
                {isLoading ? (
                    <div class="lds-ripple"><div></div><div></div></div>                ) : (
                    <FileUploader 
                        setisSubmitted={setisSubmitted} 
                        setLabels={setLabels} 
                        setIsLoading={setIsLoading}/>
                )}
            </div> 
        </div>
    );
  }

  export default TitleArea;