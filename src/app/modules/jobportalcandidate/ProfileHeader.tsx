import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEmployer } from "../jobportalemployer/employees-list/core/useGetEmployer";
import { Content } from "../../../_metronic/layout/components/content";
import { KTIcon } from "../../../_metronic/helpers";


interface ProfileHeaderProps {
    id: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ id }) => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetEmployer({
        id,
    })
    const employer = data?.employer;

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
                <div className="card mb-5 mb-xl-10">
                    <div className="card-body pt-9 pb-0">
                        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                            <p
                                                className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                                            >
                                                {employer?.cmp_name} - {employer?.cmp_code}
                                            </p>
                                        </div>

                                        <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                                            <a
                                                href={`tel:${employer?.cmp_mobn}`}
                                                className="d-flex align-items-start text-gray-500 text-hover-primary me-5 mb-2"
                                            >
                                                <KTIcon
                                                    iconName="profile-circle"
                                                    className="fs-4 me-1 pt-1 mr-2"
                                                />
                                                {employer?.cmp_mobn}
                                            </a>
                                            <p
                                                className="d-flex align-items-start text-gray-500 text-hover-primary me-5 mb-2"
                                            >
                                                <KTIcon iconName="geolocation" className="fs-4 me-1 pt-1 mr-2" />
                                                {employer?.emp_addr}<br />
                                                {employer?.emp_loca}
                                            </p>
                                            <a
                                                href={`mailto:${employer?.cmp_email}`}
                                                className="d-flex align-items-start text-gray-500 text-hover-primary me-5 mb-2"
                                            >
                                                <KTIcon iconName="sms" className="fs-4 me-1 pt-1 mr-2" />
                                                {employer?.cmp_email}
                                            </a>
                                            <a
                                                href={employer?.cmp_webs}
                                                className="d-flex align-items-start text-gray-500 text-hover-primary mb-2"
                                            >
                                                <i className="bi bi-globe-central-south-asia fs-5 me-1 pt-1 mr-2"></i>
                                                {employer?.cmp_webs}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap flex-stack">
                                    <div className="d-flex flex-column flex-grow-1 pe-8">
                                        <div className="d-flex flex-wrap">
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="fs-2 fw-bolder">
                                                        {data?.totalAccessRequests}
                                                    </div>
                                                </div>

                                                <div className="fw-bold fs-6 text-gray-500">
                                                    Total Access Requests
                                                </div>
                                            </div>
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="fs-2 fw-bolder">
                                                        {data?.totalJobPosts}
                                                    </div>
                                                </div>

                                                <div className="fw-bold fs-6 text-gray-500">
                                                    Total Job Posts
                                                </div>
                                            </div>
                                            <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="fs-2 fw-bolder">
                                                        {data?.totalProfileAccess}
                                                    </div>
                                                </div>

                                                <div className="fw-bold fs-6 text-gray-500">
                                                    Total Profile Access
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
};

export { ProfileHeader };
