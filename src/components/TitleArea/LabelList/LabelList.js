import Label from "./Label"
import './LabelList.scss';

function LabelList({labels}){
    const listItems = labels.Labels.map((label, index) =>
      <Label label={label} key={index}/> 
    );
    return (
      <div className="LabelList" >
        <div className="LabelListTitle" id="labelTitle">Labels</div>
          {listItems}
      </div>
    );
  }

  export default LabelList;