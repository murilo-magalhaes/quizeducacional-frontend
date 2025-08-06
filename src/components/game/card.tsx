import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Game } from '@/interfaces/game.interface';
import { emptyPlayer, Player } from '@/interfaces/player.interface';
import { Tag } from 'primereact/tag';
import {
  EGameStatus,
  emptyGamePlayer,
  GamePlayer,
} from '@/interfaces/gamePlayer.interface';

interface GameCardProps {
  game: Game;
  onStartGame?: (gameId: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onStartGame }) => {
  const [player, setPlayer] = useState<Player>(emptyPlayer);
  const [currentPlayer, setCurrentPlayer] =
    useState<GamePlayer>(emptyGamePlayer);

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem('player') || '');
    setPlayer(player);
  }, []);

  useEffect(() => {
    findCurrentPlayer();
  }, [player]);

  // Formatação de data
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const findCurrentPlayer = () => {
    if (player.id !== 0 && game.id !== 0) {
      const currentPlayer = game.players?.find(
        (gp) => gp.playerId === player.id,
      );

      if (currentPlayer) {
        setCurrentPlayer(currentPlayer);
      }
    }
  };

  const getStatus = () => {
    const TGameStatus = {
      [EGameStatus.NOT_STARTED]: 'Não iniciado',
      [EGameStatus.FINISHED]: 'Finalizado',
      [EGameStatus.PAUSED]: 'Pausado',
      [EGameStatus.IN_PROGRESS]: 'Em progresso',
    };

    return TGameStatus[currentPlayer.gamePlayerStatus];
  };

  const getSeverity = () => {
    const SeverityGameStatus = {
      [EGameStatus.NOT_STARTED]: 'danger',
      [EGameStatus.FINISHED]: 'info',
      [EGameStatus.PAUSED]: 'warning',
      [EGameStatus.IN_PROGRESS]: 'success',
    };

    return SeverityGameStatus[currentPlayer.gamePlayerStatus];
  };

  // Header do card
  const cardHeader = (
    <div className="flex justify-content-between align-items-center p-3 bg-primary-50">
      <div className="flex align-items-center gap-2">
        <i className="pi pi-game-controller text-primary text-xl"></i>
        <h4 className="m-0 text-primary">Jogo #{game.id}</h4>
      </div>
      <Tag
        severity={getSeverity() as 'danger' | 'info' | 'success' | 'warning'}
      >
        {getStatus()}
      </Tag>
    </div>
  );

  const getActionLabel = () => {
    const TGameStatus = {
      [EGameStatus.NOT_STARTED]: 'Iniciar',
      [EGameStatus.FINISHED]: 'Ver detalhes',
      [EGameStatus.PAUSED]: 'Continuar',
      [EGameStatus.IN_PROGRESS]: 'Continuar',
    };

    return TGameStatus[currentPlayer.gamePlayerStatus];
  };

  // Footer do card
  const cardFooter = (
    <div className="flex gap-2 py-3">
      <Button
        label={getActionLabel()}
        icon={
          currentPlayer.gamePlayerStatus === EGameStatus.FINISHED
            ? 'pi pi-info'
            : 'pi pi-play'
        }
        className="flex-1"
        severity={
          currentPlayer.gamePlayerStatus === EGameStatus.FINISHED
            ? 'info'
            : 'success'
        }
        onClick={() => onStartGame?.(game.id)}
        disabled={game.status === 'C'}
      />
    </div>
  );

  return (
    <Card
      key={game.id}
      className="border-hover shadow-2 border-round p-4"
      header={cardHeader}
      footer={cardFooter}
    >
      <div className="p-fluid">
        {/* Informações do Conteúdo */}
        <div className="mb-3">
          <div className="flex align-items-center gap-2 mb-2">
            <i className="pi pi-book text-600"></i>
            <span className="font-semibold text-600">Conteúdo:</span>
            <p className="m-0 text-900 font-medium">{game.content.title}</p>
          </div>
          {game.content.subject && (
            <small className="text-500">
              <i className="pi pi-tag mr-1"></i>
              Disciplina: {game.content.subject.title}
            </small>
          )}
        </div>

        <Divider className="my-3" />

        {/* Estatísticas do Jogo */}
        <div className="grid">
          <div className="col-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {game.qntQuestions}
              </div>
              <div className="text-sm text-600">Questões</div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {game.players?.length || 1}
              </div>
              <div className="text-sm text-600">Jogador(es)</div>
            </div>
          </div>
          <div className="col-12">
            <span className="font-semibold text-primary">
              Sua pontuação: {currentPlayer.score}/{game.qntQuestions}
            </span>
          </div>
        </div>

        {/* Status dos Jogadores */}
        {/*{totalPlayers > 0 && (*/}
        {/*  <>*/}
        {/*    <Divider className="my-3" />*/}
        {/*    <div className="mb-3">*/}
        {/*      <div className="flex align-items-center gap-2 mb-2">*/}
        {/*        <i className="pi pi-users text-600"></i>*/}
        {/*        <span className="font-semibold text-600">*/}
        {/*          Status dos Jogadores*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*      <div className="flex flex-wrap gap-2">*/}
        {/*        {playersInProgress.length > 0 && (*/}
        {/*          <Badge*/}
        {/*            value={`${playersInProgress.length} jogando`}*/}
        {/*            severity="success"*/}
        {/*          />*/}
        {/*        )}*/}
        {/*        {playersCompleted.length > 0 && (*/}
        {/*          <Badge*/}
        {/*            value={`${playersCompleted.length} finalizaram`}*/}
        {/*            severity="info"*/}
        {/*          />*/}
        {/*        )}*/}
        {/*        {playersPaused.length > 0 && (*/}
        {/*          <Badge*/}
        {/*            value={`${playersPaused.length} pausados`}*/}
        {/*            severity="warning"*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}

        {/* Informações Adicionais */}
        <div className="text-xs text-500 mt-3">
          <div className="flex justify-content-between">
            <span>
              <i className="pi pi-calendar mr-1"></i>
              Criado: {formatDate(game.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
