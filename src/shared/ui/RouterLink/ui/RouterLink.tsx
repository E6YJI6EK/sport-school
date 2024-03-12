import { Link } from 'react-router-dom';
import styled from '@emotion/styled';


const RouterLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props:any) => <RouterLink {...props} />;