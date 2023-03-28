import ClusterTable from "./clusterTable";
import "./clusters.css";
import MessagePanel from '../global/messagePanel';
import Loading from "../../components/loadingComp";


const Clusters = () =>{
  return (

<div className="mainPage">
    <div className='mainPageHeader'>
        <div className='mainPageTitle'>
        <MessagePanel />
        </div>
    </div>

    <Loading>
        <ClusterTable/>
    </Loading> 
</div>



) ;
}    

export default Clusters;
