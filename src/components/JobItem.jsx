import { useNavigate } from "react-router-dom";
import { useAddJobContext } from "../contexts/addJobContexts";
import { useJobs } from "../contexts/JobsContexts";
import Button from "./Button";



function JobItem({ job }) {
    const { deleteJob } = useJobs();
    const { setIsBlure } = useAddJobContext();
  
    const navigate = useNavigate();
    
    function handleDelete(id) {
        setIsBlure(true);
        deleteJob(id);
        setTimeout(() => {
            setIsBlure(false);
        }, 300);
    }

    function handleEdit(id) {
        setIsBlure(true);
        setTimeout(() => {
            navigate(`/app/jobForm/${id}`);
            setIsBlure(false);
        }, 500);
    }

    return (
        <>

           
                
        <tr key={job.id}>
            <td>{job.title}</td>
            <td>{job.company}</td>
            <td>
                <a href={job.website} target="_blank" rel="noopener noreferrer">{job.website}</a>
            </td>
            <td>{job.connection}</td>
            <td>{job.activityLog}</td>
            <td>{job.mustHave.join(', ')}</td>
            <td>{job.niceToHave.join(', ')}</td>
                <td className="job-actions">
                <Button style={"delete-btn"} onClick={() => handleDelete(job.id)}>Delete</Button>
                <Button style={"edit-btn"} onClick={() => handleEdit(job.id)}>Edit</Button>
                </td>
                
          </tr>
        </>
    )
}

export default JobItem
