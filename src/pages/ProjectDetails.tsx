import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams} from 'react-router-dom'
import type { Project } from "../types/types";

function ProjectDetailsPage() {
    const [project, setProjects] = useState<Project | null>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");

      const {projectId} = useParams()

      useEffect(() => {
        const fetchProjectDetails = async () => {
          try {
            setLoading(true);
            const res = await apiClient.get(`/api/projects/${projectId}`);
            console.log(res.data)
            setProjects(res.data);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            }
          } finally {
            setLoading(false);
          }
        };
        fetchProjectDetails();
      }, [projectId]);
    
    if (loading) return <div className="text-3xl text-white">Loading...</div>;
    if (error) return <div className="text-3xl text-white">Error Loading Project...</div>;

    return (
        <div className='text-white'>
            <h1 className='text-4xl'>Project Details</h1>
            <div>
                <div className='text-3xl'>
                    {project?.name}
                </div>
                <div className='text-xl'>
                    {project?.description}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetailsPage;