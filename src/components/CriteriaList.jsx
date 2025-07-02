
function Criterialist({ children, criterion, deleteCriteria }) {
    
    
    if (!criterion || criterion.length === 0) {
        return (
            <div className="criterion-list">
                {children}
                <p>No criteria defined.</p>
            </div>
        );
    }
    return (
        <div className="criterion-list">
            {children}
            <ul className="criterion-items">
                {criterion.map((item, index) => (
                    <li key={index}>
                       <span>{item.criteria}</span>
                        <button onClick={() => deleteCriteria(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Criterialist;
