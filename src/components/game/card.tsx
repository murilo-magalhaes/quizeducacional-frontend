import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Game } from '@/interfaces/game.interface';
import { EGameStatus } from '@/interfaces/gamePlayer.interface';
import { emptyPlayer, Player } from '@/interfaces/player.interface';

interface GameCardProps {
  game: Game;
  onStartGame?: (gameId: number) => void;
  onViewDetails?: (gameId: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onStartGame,
  onViewDetails,
}) => {
  // Estatísticas dos jogadores
  const players = game.players || [];

  const playersInProgress = players.filter(
    (p) => p.gameStatus === EGameStatus.IN_PROGRESS,
  );
  const playersCompleted = players.filter(
    (p) => p.gameStatus === EGameStatus.WON,
  );
  const playersPaused = players.filter(
    (p) => p.gameStatus === EGameStatus.PAUSED,
  );
  const totalPlayers = players.length;

  const [player, setPlayer] = useState<Player>(emptyPlayer);

  useEffect(() => {
    const player = JSON.parse(localStorage.getItem('player') || '');
    setPlayer(player);
  }, []);

  // Status do jogo baseado nos jogadores
  const getGameStatus = () => {
    if (playersInProgress.length > 0) return 'Em Andamento';
    if (totalPlayers === 0) return 'Aguardando Jogadores';
    if (playersCompleted.length === totalPlayers) return 'Finalizado';
    return 'Pausado';
  };

  const getStatusSeverity = () => {
    const status = getGameStatus();
    switch (status) {
      case 'Em Andamento':
        return 'success';
      case 'Finalizado':
        return 'info';
      case 'Pausado':
        return 'warning';
      default:
        return 'secondary';
    }
  };

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

  // Header does card
  const cardHeader = (
    <div className="flex justify-content-between align-items-center p-3 bg-primary-50">
      <div className="flex align-items-center gap-2">
        <i className="pi pi-game-controller text-primary text-xl"></i>
        <h4 className="m-0 text-primary">Jogo #{game.id}</h4>
      </div>
      <Tag
        value={getGameStatus()}
        severity={getStatusSeverity()}
        icon="pi pi-circle-fill"
      />
    </div>
  );

  // Footer does card
  const cardFooter = (
    <div className="flex gap-2 py-3">
      <Button
        label={
          players.find((p) => p.playerId === player.id)?.gameStatus ===
          EGameStatus.IN_PROGRESS
            ? 'Continuar'
            : 'Iniciar'
        }
        icon="pi pi-play"
        className="flex-1"
        severity="success"
        onClick={() => onStartGame?.(game.id)}
        disabled={game.status === 'C'}
      />

      <Button
        label="Detalhes"
        icon="pi pi-info-circle"
        className="flex-1"
        severity="info"
        outlined
        onClick={() => onViewDetails?.(game.id)}
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
                {totalPlayers}
              </div>
              <div className="text-sm text-600">Jogadores</div>
            </div>
          </div>
        </div>

        {/* Status dos Jogadores */}
        {totalPlayers > 0 && (
          <>
            <Divider className="my-3" />
            <div className="mb-3">
              <div className="flex align-items-center gap-2 mb-2">
                <i className="pi pi-users text-600"></i>
                <span className="font-semibold text-600">
                  Status dos Jogadores
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {playersInProgress.length > 0 && (
                  <Badge
                    value={`${playersInProgress.length} jogando`}
                    severity="success"
                  />
                )}
                {playersCompleted.length > 0 && (
                  <Badge
                    value={`${playersCompleted.length} finalizaram`}
                    severity="info"
                  />
                )}
                {playersPaused.length > 0 && (
                  <Badge
                    value={`${playersPaused.length} pausados`}
                    severity="warning"
                  />
                )}
              </div>
            </div>
          </>
        )}

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
