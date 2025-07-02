import { useJobs } from "../contexts/JobsContexts";
import AddCriteria from "./AddCriteria";
import Criterialist from "./CriteriaList";
import Loading from "./Loading";



function NiceToHaveCriteria() {
    const { niceToHaveCriteria, deleteNiceToHaveCriterion, addNiceToHaveCriterion, isLoading } = useJobs();

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <Criterialist criterion={niceToHaveCriteria} deleteCriteria={deleteNiceToHaveCriterion}>
                    <h2>Nice to Have Criteria</h2>
                    <p>Define the desirable qualifications and skills that can enhance a candidate's application.</p>
                
            </Criterialist>
            <AddCriteria criteriaType={niceToHaveCriteria} callFunction={addNiceToHaveCriterion} />
        </>
    )
}


export default NiceToHaveCriteria;
