import React from "react";
import { Card, CardBody } from "reactstrap";

const Tag = ({ tag }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Tag Name: {tag.name}</p>
            <CardBody>
                <p>
                    <strong>{tag.name}</strong>
                </p>
            </CardBody>
        </Card>
    );
};

export default Tag;