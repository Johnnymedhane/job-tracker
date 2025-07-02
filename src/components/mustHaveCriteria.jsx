

import { useJobs } from "../contexts/JobsContexts";
import Loading from "./Loading";
import AddCriteria from "./AddCriteria";
import Criterialist from "./CriteriaList";


function MustHaveCriteria() {
    const { mustHaveCriteria, deleteMustHaveCriterion, addMustHaveCriterion, isLoading } = useJobs();
  
    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Criterialist criterion={mustHaveCriteria} deleteCriteria={deleteMustHaveCriterion}>
                   
                        
                            <h2>Must Have Criteria</h2>
                <p>Define the essential qualifications and skills required for the job.</p>               
            </Criterialist>
            <AddCriteria criteriaType={mustHaveCriteria} callFunction={addMustHaveCriterion} />
        </>
    )
}

    export default MustHaveCriteria;
