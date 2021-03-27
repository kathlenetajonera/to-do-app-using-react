const Options = ({ filterList }) => {
    return (
        <div className="options">
            <p className="options__remaining"></p>
        
            <div className="options__categories">
                <p 
                    className="options__category options__category--active" 
                    onClick={filterList} 
                    data-value="all">
                    All
                </p>
                <p 
                    className="options__category" 
                    onClick={filterList} 
                    data-value="active">
                    Active
                </p>
                <p 
                    className="options__category" 
                    onClick={filterList} 
                    data-value="completed">
                    Completed
                </p>

                <p className="options__instruction">Drag and drop to reorder list</p>
            </div>
        
            <p className="options__clear">Clear Completed</p>
        </div>
    )
}

export default Options;