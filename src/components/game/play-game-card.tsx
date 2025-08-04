import { Divider } from 'primereact/divider';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { emptyGame, Game } from '@/interfaces/game.interface';
import useToastContext from '@/hooks/toast';
import { api } from '@/api';
import {
  emptyGameQuestion,
  GameQuestion,
} from '@/interfaces/gameQuestion.interface';
import { mockGames } from '@/mock/game.mock';
import Loading from '@/components/Loading';
import numberToChar from '@/utils/numberToChar';
import { emptyPlayer, Player } from '@/interfaces/player.interface';
import { emptyGamePlayer, GamePlayer } from '@/interfaces/gamePlayer.interface';
import { Button } from 'primereact/button';

interface Props {
  id: number;
  visible: boolean;
  onClose: () => void;
}

export default function PlayGameCard({ id, visible, onClose }: Props) {
  const toast = useToastContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [player, setPlayer] = useState<Player>(emptyPlayer);

  const [game, setGame] = useState<Game>(emptyGame);
  const [currentQuestion, setCurrentQuestion] =
    useState<GameQuestion>(emptyGameQuestion);
  const [currentPlayer, setCurrentPlayer] =
    useState<GamePlayer>(emptyGamePlayer);

  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [selectedAlternativeId, setSelectedAlternativeId] =
    useState<number>(-1);
  const [correctAlternativeId, setCorrectAlternativeId] = useState<number>(-1);

  useEffect(() => {
    if (visible) {
      loadGame().then();

      const player = localStorage.getItem('player');
      if (player !== null) {
        setPlayer(JSON.parse(player));
      }
    }
  }, [visible]);

  useEffect(() => {
    findCurrentPlayer();
  }, [player, game]);

  const findCurrentPlayer = () => {
    setCurrentPlayer(
      game.players.find((gp) => gp.playerId === player.id) || emptyGamePlayer,
    );
  };

  const findCurrentQuestion = (game: Game) => {
    if (game.playersAnswers?.length === 0) {
      setCurrentQuestion(game.questions[0]);
    }
  };

  const loadGame = async () => {
    setIsLoading(true);
    await api
      .get(`/games/${id}`)
      .then((res) => {
        console.log(res.data);
        // setGame(res.data);
        setGame(mockGames[0]);
        findCurrentQuestion(mockGames[0]);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const selectAlternative = async (questionAlternativeId: number) => {
    setIsLoading(true);

    await api
      .post(`/players-answers`, {
        gamePlayerId: currentPlayer.id,
        questionAlternativeId,
      })
      .then((res) => {
        if (res.data) {
          setSelectedAlternativeId(questionAlternativeId);
          setCorrectAlternativeId(res.data);
          if (res.data === questionAlternativeId) {
            toast('success', 'Successo', 'Certa resposta, ma oi!');
          } else {
            toast('error', 'Erro', 'Resposta errada! Não consegue né?');
          }
          setShowNextButton(true);
        }
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const nextQuestion = () => {
    if (currentQuestion.position < game.qntQuestions - 1) {
      setCurrentQuestion(
        (prev) =>
          game.questions.find((gq) => gq.position === prev.position + 1) ||
          emptyGameQuestion,
      );
      setShowNextButton(false);
      setSelectedAlternativeId(-1);
      setCorrectAlternativeId(-1);
    }
  };

  const getColorByAnswer = (id: number): string => {
    let color = '';
    if (selectedAlternativeId > 0) {
      switch (id) {
        case correctAlternativeId:
          color = 'var(--green-500)';
          break;
        case selectedAlternativeId:
          color = 'var(--red-500)';
          break;
        default:
          color = '';
          break;
      }
    }
    return color;
  };

  return (
    <Dialog
      className={'border-primary w-8'}
      visible={visible}
      onHide={onClose}
      header={`Jogo ${game.id}`}
    >
      <Loading isLoading={isLoading} />
      <div className={'p-fluid grid formgrid'}>
        <div className={'col-6'}>
          <p className={'m-0'}>Disciplina: {game.content.subject.title}</p>
        </div>
        <div className={'col-6'}>
          <p className={'m-0'}>Conteúdo: {game.content.title}</p>
        </div>

        <Divider />
        <div className={'col-12 flex justify-content-end'}>
          <b>
            {currentQuestion.position + 1}/{game.qntQuestions}
          </b>
        </div>
        <div className={'col-12 mt-4'}>
          <p>
            <b>{currentQuestion.position + 1}.</b>{' '}
            {currentQuestion.question?.statement}
          </p>
        </div>
        {currentQuestion.question?.alternatives.map((questionAlternative) => (
          <div
            key={questionAlternative.id}
            className={'col-6 cursor-pointer mt-2 p-1'}
          >
            <p
              style={{
                backgroundColor: getColorByAnswer(questionAlternative.id),
              }}
              onClick={() => selectAlternative(questionAlternative.id)}
              className={'border-primary highlight-hover p-2 m-0'}
            >
              <b>{numberToChar(questionAlternative.position + 1)})</b>{' '}
              {questionAlternative.alternative?.alternativeText}
            </p>
          </div>
        ))}
        {showNextButton && (
          <div className={'col-12 p-0 mt-4'}>
            <Button
              className={'w-full'}
              label={'Próxima questão'}
              onClick={nextQuestion}
              iconPos={'right'}
              icon={'pi pi-arrow-right'}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
