import styled from 'styled-components';

// Components
import CenterDiv from '../../../components/CenterDiv/CenterDiv';

// Global
import {COLOR} from '../../../global/const';
import {MEDIUM} from '../../../components/Typography';
import { LINE_HEIGHT } from '../../../components/Button/Button';

export const SolutionDiv = styled(CenterDiv)`
margin: 64px auto 104px auto;
height: 240px;
overflow: scroll;
`;

export const Solution = styled.p`
font-family: Prompt;
font-weight: ${MEDIUM};
font-size: 20px;
line-height: ${LINE_HEIGHT};
color: ${(props) => (props.answer ? `${COLOR.CELERY}` : `${COLOR.TRINIDAD}`)};
`;