import styled from 'styled-components';

// Components
import CenterDiv from '../../../components/CenterDiv/CenterDiv';

// Global
import {COLOR} from '../../../global/const';
import {MEDIUM} from '../../../components/Typography';

export const SolutionDiv = styled(CenterDiv)`
margin: 64px auto 104px auto;
height: 240px;
overflow: scroll;
`;

export const Solution = styled.p`
font-family: Prompt;
font-weight: ${MEDIUM};
font-size: 20px;
color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;