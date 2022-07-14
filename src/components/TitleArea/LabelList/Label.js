function Label({label}){
    return(
        <div key={String(label.Name)} className="listItem">
                <div className="listItemName">
                    {String(label.Name)} 
                </div>
                <div className="listItemConfidence" style={{width: Math.ceil(label.Confidence).toString() + "%"}}> 
                    {String(Math.ceil(label.Confidence) + "%")} 
                </div> 
                <div className="listItemFooter"> 
                    {label.Parents.map((parent) =>
                        <div key={String(parent.Name)} className="listItemCategories">{String(parent.Name)}</div>
                    )}
                </div>
        </div> 
    );
}
export default Label;