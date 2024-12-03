import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../../_metronic/layout/components/content";
import { KTIcon } from "../../../_metronic/helpers";
import { useGetCNDById } from "./core/useGetCNDById";
import moment from "moment";
import axios from "axios";
import { REQ } from "./core/_.request";
import placeHolderImg from "../../../../public/media/avatars/blank.png";

interface CadidateInfoHeaderProps {
    id: string;
}

const CadidateInfoHeader: FC<CadidateInfoHeaderProps> = ({ id }) => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState<string | undefined>(null);
    const { data, isLoading } = useGetCNDById({
        page: 1,
        limit: 10,
        can_code: parseInt(id),
    })
    const candidate = data?.records[0];

    const handleDownloadResume = async (id: number, fileName: string) => {
        try {
            const response = await axios.get(
                REQ.DOWNLOAD_CANDIDATE_RESUME(id),
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(response as any);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName}_resume.pdf`);
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    const handleDownloadProImg = async (id: number) => {
        try {
            const response = await axios.get(
                REQ.DOWNLOAD_CANDIDATE_PROFILE_IMAGE(id),
                {
                    responseType: "blob",
                }
            );
            if (response) {
                const imageUrl = URL.createObjectURL(response as any);
                setProfileImage(imageUrl);
            }
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    useEffect(() => {
        if (id) {
            handleDownloadProImg(parseInt(id));
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Content>
                <div className="d-flex align-items-center mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-secondary me-3"
                    >
                        <KTIcon iconName="left" className="me-2" />
                        Back
                    </button>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-gray-800 text-hover-primary fw-bolder mb-3">
                            {candidate.can_name} - {candidate.job_category?.cate_desc}
                        </h2>
                        <div className="mb-4">
                            <img
                                src={profileImage || placeHolderImg}
                                alt="Candidate Profile"
                                className="img-thumbnail rounded-circle"
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                        </div>
                        {candidate.can_about && (
                            <>
                                <p className="fw-bold mb-2">About:</p>
                                <p>{candidate.can_about}</p>
                            </>
                        )}
                        {candidate.can_skill.split(",").length > 0 && (
                            <div className="mb-4">
                                <p className="fw-bold mb-2">Skills:</p>
                                {candidate.can_skill.split(",").map((skill: string, index: number) => (
                                    <span key={index} className="badge bg-primary me-2">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mb-4">
                            <p className="fw-bold mb-2">Contact Information:</p>
                            <p>Email: {candidate.can_email}</p>
                            <p>Mobile: {candidate.can_mobn}</p>
                        </div>
                        {candidate.candidate_edu.length > 0 && (
                            <div className="mb-4">
                                <p className="fw-bold mb-2">Educational Details:</p>
                                <div className="row">
                                    {candidate.candidate_edu.map((edu: any, index: number) => (
                                        <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
                                            <div className="card p-2 pt-5">
                                                <p>
                                                    <strong>{edu.can_edu}:</strong> {edu.can_scho} ({edu.can_pasy})
                                                </p>
                                                <p className="text-truncate">
                                                    Stream: {edu.can_stre}, Percentage: {edu.can_perc}, CGPA:{" "}
                                                    {edu.can_cgpa}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {candidate.candidate_exp.length > 0 && (
                            <div className="mb-4">
                                <p className="fw-bold mb-2">Experience:</p>
                                <div className="row">
                                    {candidate.candidate_exp.map((exp: any, index: number) => (
                                        <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
                                            <div className="card p-2 pt-5">
                                                <p>
                                                    <strong>{exp.emp_name}:</strong> {exp.exp_desg} ({exp.exp_type})
                                                </p>
                                                <p>
                                                    From: {moment(exp.job_stdt).format("MM/DD/YYYY")} To: {moment(exp.job_endt).format("MM/DD/YYYY")}
                                                </p>
                                                <p>CTC: {exp.cur_ctc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {candidate?.can_resume && (
                            <span
                                className="text-primary fw-bold d-flex align-items-center"
                                onClick={() => handleDownloadResume(candidate?.can_code, candidate.can_name)}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-download me-2 text-primary fs-3"></i>
                                Download Resume
                            </span>
                        )}
                    </div>
                </div>
            </Content>
        </>
    );
};

export { CadidateInfoHeader };
