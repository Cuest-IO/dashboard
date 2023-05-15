import NodesTable from "./nodeTable";  
import MessagePanel from '../global/messagePanel';
import Loading from "../../components/loadingComp";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { Auth } from "aws-amplify";

const Nodes = () =>{

    const { isLoading, error, data } = useQuery(['clusters'], async () => {
        const response = await axios.get(
          `https://${process.env.REACT_APP_REST_URI}/devices/node`,
          {
            headers: {
              Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            },
          }
        );
      
        return response.data; // Return the data from the response
      });
      
    const infoMsg = ( !data || data.length == 0 ) ? "Please connect your first Kubernetes Cluster" : "";
    console.log(data, isLoading, error, infoMsg)        
        
  return (

<div className="mainPage">
    <div className='mainPageHeader'>
        <div className='mainPageTitle'>
        <MessagePanel message={infoMsg}/>
        </div>
    </div>

    <Loading>
        <NodesTable nodes={data}/>
    </Loading> 
</div>

) ;
}    

export default Nodes;
