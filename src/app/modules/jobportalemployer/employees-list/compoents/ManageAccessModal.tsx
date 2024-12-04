import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { useGetCNDWithAccess } from '../../../jobportaljobpost/core/useGetCNDWithAccess';
import { useUpdateCandidatesAccess } from '../../../jobportaljobpost/core/useUpdateCandidatesAccess';
import { toast } from 'react-toastify';

interface ManageAccessModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    data?: any;
    refetchJobPosts?: any;
}

interface Candidate {
    id: number;
    candidateId: number;
    Candidate: {
        can_name: string;
        can_code: number;
    };
}

const ManageAccessModal: React.FC<ManageAccessModalProps> = ({ show, onClose, title, data, refetchJobPosts }) => {
    const { data: CandidateData, isLoading } = useGetCNDWithAccess({
        page: 1,
        limit: 1000,
        employerId: data?.cmp_id,
    });

    const { mutate: updateAccess, isLoading: loading } = useUpdateCandidatesAccess();

    const [accessibleCandidates, setAccessibleCandidates] = useState<Candidate[]>([]);
    const [unaccessedCandidates, setUnaccessedCandidates] = useState<Candidate[]>([]);

    const handleSaveChanges = async () => {
        try {
            updateAccess(
                {
                    jobPostId: data?.job_id,
                    employerId: data?.cmp_id,
                    candidateIds: accessibleCandidates.map((c) => c.candidateId),
                },
                {
                    onSuccess: () => {
                        refetchJobPosts();
                        toast.success('Access updated successfully.');
                        onClose();
                    },
                }
            );
        } catch (error) {
            console.error('Error updating candidate access:', error);
        }
    };

    useEffect(() => {
        if (CandidateData?.records) {
            const accessed = CandidateData.records.filter((item: Candidate) =>
                data?.profileAccess.includes(item.candidateId)
            );

            const unaccessed = CandidateData.records.filter((item: Candidate) =>
                !data?.profileAccess.includes(item.candidateId)
            );
            setAccessibleCandidates(accessed);
            setUnaccessedCandidates(unaccessed);
        }
    }, [CandidateData, data]);

    const moveToAccessible = (candidate: Candidate) => {
        setUnaccessedCandidates((prev) => prev.filter((c) => c.candidateId !== candidate.candidateId));
        setAccessibleCandidates((prev) => [...prev, candidate]);
    };

    const moveToUnaccessed = (candidate: Candidate) => {
        setAccessibleCandidates((prev) => prev.filter((c) => c.candidateId !== candidate.candidateId));
        setUnaccessedCandidates((prev) => [...prev, candidate]);
    };

    const moveAllToAccessible = () => {
        setAccessibleCandidates((prev) => [...prev, ...unaccessedCandidates]);
        setUnaccessedCandidates([]);
    };

    const moveAllToUnaccessed = () => {
        setUnaccessedCandidates((prev) => [...prev, ...accessibleCandidates]);
        setAccessibleCandidates([]);
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || 'Manage Access'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column flex-md-row">
                    <div className="w-100 w-md-50 border p-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Unaccessed Candidates</h5>
                        </div>
                        <Button
                            variant="btn btn-primary my-3 w-100"
                            size="sm"
                            className="text-nowrap d-flex align-items-center justify-content-center"
                            onClick={moveAllToAccessible}
                            disabled={isLoading || unaccessedCandidates.length === 0 || loading}
                        >
                            <i className="bi bi-arrow-down ms-2 d-block d-md-none"></i>
                            <span className='d-none d-md-block'>Move all to right</span>
                            <span className='d-block d-md-none'>Move all to bottom</span>
                            <i className="bi bi-arrow-right ms-2 d-none d-md-block"></i>
                        </Button>
                        <div
                            style={{
                                minHeight: '150px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                            }}
                        >
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : unaccessedCandidates.length > 0 ? (
                                <ListGroup>
                                    {unaccessedCandidates.map((candidate) => (
                                        <ListGroup.Item
                                            key={candidate.candidateId}
                                            action
                                            onClick={() => moveToAccessible(candidate)}
                                        >
                                            {candidate.Candidate.can_name}
                                            <i
                                                className="bi bi-plus-circle"
                                                style={{ float: 'right', cursor: 'pointer' }}
                                            />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="text-muted mt-1">No candidates available.</p>
                            )}
                        </div>
                    </div>

                    <div className="d-none d-md-flex w-md-10 align-items-center justify-content-center">
                        <div className="border-1 h-100"></div>
                    </div>

                    <div className="w-100 w-md-50 border p-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5>Accessible Candidates</h5>
                        </div>
                        <Button
                            variant="btn btn-primary my-3 w-100"
                            size="sm"
                            className="d-flex align-items-center justify-content-center"
                            onClick={moveAllToUnaccessed}
                            disabled={accessibleCandidates.length === 0 || loading}
                        >
                            <i className="bi bi-arrow-left me-2 d-none d-md-block"></i>
                            <i className="bi bi-arrow-up me-2 d-block d-md-none"></i>
                            <span className='d-none d-md-block'>Move all to left</span>
                            <span className='d-block d-md-none'>Move all to top</span>
                        </Button>
                        <div
                            style={{
                                minHeight: '150px',
                                maxHeight: '300px',
                                overflowY: 'auto',
                            }}
                        >
                            {accessibleCandidates.length > 0 ? (
                                <ListGroup>
                                    {accessibleCandidates.map((candidate) => (
                                        <ListGroup.Item
                                            key={candidate.candidateId}
                                            action
                                            onClick={() => moveToUnaccessed(candidate)}
                                        >
                                            {candidate.Candidate.can_name}
                                            <i
                                                className="bi bi-dash-circle"
                                                style={{ float: 'right', cursor: 'pointer' }}
                                            />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p className="text-muted mt-1">No candidates available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveChanges()} disabled={loading}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManageAccessModal;
