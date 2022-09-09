import { useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

import { VideoPlayer } from '../clips/components/map-details/components/VideoPlayer';
import { VStack } from '../components/VStack';

import { Fail } from './fails.types';
import { useFails } from './useFails';

export function Fails() {
  const [selectedMap, setSelectedMap] = useState<Fail | null>(null);
  const { fails } = useFails();

  return (
    <VStack className="gap-3 p-0 pb-2 text-center flex-fill h-100">
      {fails.length === 0 && <>Aucune clip disponible.</>}
      {fails.length !== 0 && (
        <Row className="flex-fill">
          <Col>
            <ButtonGroup size="sm" className="flex-fill flex-wrap d-flex">
              {fails.map((mapEntry) => (
                <Button
                  key={`${mapEntry.idx}-${mapEntry.id}`}
                  variant={selectedMap?.idx === mapEntry.idx ? 'white' : 'outline-white'}
                  className="m-1 fw-bolder mw-10 py-2 d-flex align-items-center justify-content-center flex-fill"
                  onClick={() => setSelectedMap(mapEntry)}
                >
                  <span>{mapEntry.id}</span>
                </Button>
              ))}
            </ButtonGroup>
          </Col>
          <Col>
            <VStack className="gap-2 p-0 pb-2 mt-1 text-center flex-fill h-100">{selectedMap && <VideoPlayer url={(selectedMap && selectedMap.clip) || ''} />}</VStack>
          </Col>
        </Row>
      )}
    </VStack>
  );
}
