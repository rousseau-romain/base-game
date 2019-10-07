import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const left = ({ isOpen }) => (isOpen ? '50%' : '-60%');

const CardGame = styled(Card)`
    width: 345px;
    margin: auto;
    transition: .375s ease-in-out;
    position: absolute;
    /* left: 50%; */
    transform: translateX(-50%);
    left: ${(left)};
`;

export default CardGame;
