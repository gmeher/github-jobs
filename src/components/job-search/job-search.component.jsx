import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import JobCard from '../job-card/job-card.component';
import { Container } from 'react-bootstrap';
import JobsPagination from '../jobs-pagination/jobs-pagination.component';
import SearchForm from '../search-form/search-form.component';
const JobSearch = () => {
    const [params, setParams] = useState({});
    const [page, setPage] = useState(1);
    const { jobs, error, loading, hasNextPage } = useFetchJobs(params, page);
    const handleParamsChange = (e) => {
        const param = e.target.name;
        const value = e.target.value;

        setParams(prevParams => ({ ...prevParams, [param]: value }))
    }

    return (
        <Container maxWidth="sm my-4">

            <div>
                <h1 className="mb-5">Github Jobs</h1>
                <SearchForm params={params} onParamsChange={handleParamsChange} />
                <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
            </div>

            {loading ? <h1>loading.....</h1> : error && <h1> error please try refreshing page </h1>}

            {jobs.map(job => {
                return (
                    <JobCard key={job.id} job={job} />
                )
            })}
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </Container>
    )
}

export default JobSearch;