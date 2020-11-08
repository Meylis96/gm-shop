import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({title, description, keyword}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keyword" content={keyword} />
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: "Добро пожаловать в интернет магазин бытовой химии GM Shop",
    description: "Самые доступные цены",
    keyword: "Интернет иагазин, Ашхабад, бытовая химия"
}

export default Meta;
