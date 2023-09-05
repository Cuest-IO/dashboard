import NodeViewCard from "./nodeViewCard";
import React, { useMemo } from 'react';
import Loading from "../../components/loadingComp";

const ClusterView = ({ nodes }) => {
  const cards = useMemo(() => {
    if (nodes) {
      return [...nodes.values()]
    }
    return []
  }, [nodes])

  return (
    <div className="mainPage">
      <div className='mainPageHeader'>
        <div className='mainPageTitle'>
        </div>
      </div>
      <Loading>
        <div className="viewCardContainer" id="cardContainer">
          {
            (cards.length === 0)
              ? (
                <div className="cardHeader">Waiting for nodes to connect</div>
              )
              : (
                cards.map((card) => (
                  <NodeViewCard node={card} key={card.nodeName}/>
                ))
              )
          }

        </div>
      </Loading>
    </div>
  )
};



export default ClusterView;
