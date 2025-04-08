import React from 'react';
import { Carousel } from 'react-bootstrap';

const TrendingCelebs = ({ data }) => {
  const edges = data?.data?.topMeterNames?.edges || [];
  
  if (edges.length === 0) {
    return (
      <div className="text-center text-white py-4">
        No celebrity data available.
      </div>
    );
  }

  const chunkSize = 6;
  const celebrityGroups = [];
  for (let i = 0; i < edges.length; i += chunkSize) {
    celebrityGroups.push(edges.slice(i, i + chunkSize));
  }

  return (
    <div className="bg-black text-light py-4">
      <Carousel indicators={false} interval={null}>
        {celebrityGroups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="d-flex flex-wrap justify-content-center gap-4 px-3">
              {group.map(({ node }, index) => {
                const name = node?.nameText?.text || 'Unknown';
                const imageUrl = node?.primaryImage?.url || '';
            
                return (
                  <div key={node?.id || index} className="text-center" style={{ width: '150px' }}>
                    <div className="position-relative mx-auto" style={{ width: '120px' }}>
                      <img
                        src={imageUrl}
                        alt={name}
                        className="rounded-circle"
                        style={{
                          height: '120px',
                          width: '120px',
                          objectFit: 'cover',
                          border: '3px solid #333'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="mt-2" style={{ 
                      minHeight: '3em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span className="text-wrap">{name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default TrendingCelebs;