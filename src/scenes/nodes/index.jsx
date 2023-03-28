import NodesTable from "./nodeTable";  
import MessagePanel from '../global/messagePanel';
import Loading from "../../components/loadingComp";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import { rows as nodes } from "../../data/mockData";

const Nodes = () =>{

    const { isLoading, error, data } = useQuery(
        ['nodes'],
        async () => {
          const { data } = await axios.get("".concat(process.env.REACT_APP_REST_URI, "/nodes")
            
          );
          
          console.log(data);
          return data;
        });

        
  return (

<div className="mainPage">
    <div className='mainPageHeader'>
        <div className='mainPageTitle'>
        <MessagePanel />
        </div>
    </div>

    <Loading>
        <NodesTable nodes={data}/>
    </Loading> 
</div>

) ;
}    

export default Nodes;
