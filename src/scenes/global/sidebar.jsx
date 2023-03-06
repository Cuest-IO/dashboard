import './sidebar.css';
import logoImage  from './icons/horizontal.png';
import { NavLink } from "react-router-dom";
import React from "react";

const firstMenu=[
    { navigate : "/", title : "Dashboard", activeImg : "/icons/dashboardblue.png", inActiveImg : "/icons/dashboardgray.png"},
    { navigate : "/clusters", title : "Clusters", activeImg : "/icons/clustersblue.png", inActiveImg : "/icons/clustersgray.png"},
    { navigate : "/Nodes", title : "Nodes", activeImg : "/icons/nodesblue.png", inActiveImg : "/icons/nodesgray.png" }
];


const secondMenu=[
    { navigate : "/Employees", title : "Employees", activeImg : "/icons/teamblue.png", inActiveImg : "/icons/teamgray.png"},
    { navigate : "/Prices", title : "Prices", activeImg : "/icons/pricingblue.png", inActiveImg : "/icons/pricinggray.png"},
    { navigate : "/Payments", title : "Payments", activeImg : "/icons/paymentsblue.png", inActiveImg : "/icons/paymentsgray.png" }
];



const Sidebar = () => {
    return (
        <div className="sideBar"> 
            <div className="sideBarWrapper">
                <div className="sideBarMenu">
                    <img className="sideBarLogo" src={logoImage} alt="ddd"/>
                    <ul className="sideBarList">
                        {firstMenu.map((item, index)=>{
                           return (   
                          <RenderSideBar item={item}/>
                           );
                        })}
                    </ul>
                    <ul className="sideBarList" style={{top: "347px"}}>
                        {secondMenu.map((item, index)=>{
                           return (   
                          <RenderSideBar item={item}/>
                           );
                        })}
                    </ul>
                    <ul className="upgradePlan" style={{top: "543px"}}>
                            <img className="upgradeImg" src={'/icons/upgradenow.png'} alt="" />
                    </ul>
                </div>
            </div> 
        </div>
        );
}    

export default Sidebar;

function RenderSideBar(props){
 
    const {item} = props; 
    return (
    <NavLink 
 className={({isActive}) => isActive ? "linkStyleActive" : "linkStyle"}  
 to={item.navigate}
 children={({ isActive }) => {
     const dashImage = isActive ? item.activeImg : item.inActiveImg;
     const active =isActive;
     return (
         <>
         <li className="sideBarListItem">
             <img className="sideBarImage" src={dashImage} alt="" />
             <div className="sideBarListTitle">
                 {item.title}
             </div>
             <div className={active ? "activeSign" : "" }>
             </div>
         </li>
         </>
     );
   }}
/>
)
}
