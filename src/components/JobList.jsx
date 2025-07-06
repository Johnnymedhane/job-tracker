import Loading from './Loading';
import JobItem from './JobItem';
import { useJobs } from '../contexts/JobsContexts';

import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAddJobContext } from '../contexts/addJobContexts';


function JobList() {

  const{ isBlure, setIsBlure } = useAddJobContext();
  const navigate = useNavigate();

  
    const {
      jobs,
      loading,
      mustHaveCriteria,
      niceToHaveCriteria,
      error
    } = useJobs();
   
  function handleAddJob() {
    setIsBlure(true);
      setTimeout(() => {
        navigate(mustHaveCriteria.length === 0 || niceToHaveCriteria.length === 0 ? "/criterion" : "/app/jobForm");
        setIsBlure(false);
      }, 500);
  }



  if (loading) return <Loading />;
  if (error) return <div className="error">Error fetching jobs</div>;

  return (
    <div className="job-list">
        <h2 className="job-list-title">📋 Your Job Tracker</h2>
      <p className="job-list-description">
        Here you can see all the jobs you have added.
        You can add, edit, or delete jobs as needed.
        Each job will be evaluated based on your defined criteria.
      </p>

     {(mustHaveCriteria.length > 0 || niceToHaveCriteria.length > 0 ) && <div className='defined-criterion'>
        <div className='must-have-criteria'>
          <h3>Must Have Criteria you defined.</h3>
          <ul>
            {mustHaveCriteria.map((criterion) => (
              <li key={criterion.id}>{criterion.criteria}</li>
            ))}
          </ul>
        </div>

        <div className='nice-to-have-criteria'>
          <h3>Nice To Have Criteria you defined.</h3>
          <ul>
            {niceToHaveCriteria.map((criterion) => (
              <li key={criterion.id}>{criterion.criteria}</li>
            ))}
          </ul>
        </div>

      </div>
      }

       
         
      <Button style={"jobs-btn"} onClick={handleAddJob}>
        <span> + Add New Job</span>
        <span>Let's Go</span>
      </Button>
        

      
     
      {jobs.length === 0 ? (
         <p>No jobs added yet. Click <strong>+ Add New Job</strong> to get started.
         </p>
      ) : (
        <div className='job-table-wrapper'>
        <table className={`job-table ${isBlure ? "blurred" : ""}`}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Website</th>
              <th>Connection</th>
              <th>Activity Log</th>
              <th>Must Have</th>
              <th>Nice To Have</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => <JobItem key={job.id} job={job} />)}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default JobList;
