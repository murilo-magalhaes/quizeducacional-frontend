import React, { useEffect, useState } from 'react';
import { emptyGame, Game } from '@/interfaces/game.interface';
import { api } from '@/api';
import useToastContext from '@/hooks/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Content, emptyContent } from '@/interfaces/content.interface';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export interface DialogProps {
  visible: boolean;
  onClose: () => void;
}

const CreateGameDialog: React.FC<DialogProps> = (props: DialogProps) => {
  const toast = useToastContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [game, setGame] = useState<Game>(emptyGame);

  const [contents, setContents] = useState<Content[]>([]);
  const [content, setContent] = useState<Content>(emptyContent);

  const loadContents = async () => {
    setIsLoading(true);
    api
      .get(`/contents`)
      .then((res) => {
        console.log(res);
        setContents(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (props.visible) loadContents().then();
  }, [props.visible]);

  const generateGame = async () => {
    setIsLoading(true);
    api
      .post(`/games/generate`, {
        qntQuestions: game.qntQuestions,
        contentId: game.contentId,
      })
      .then((res) => {
        console.log(res);
        toast('success', 'Sucesso', 'Novo jogo gerado com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog
      className={'border-primary p-fluid grid formgrid'}
      visible={props.visible}
      onHide={props.onClose}
      header={'Criar novo jogo'}
    >
      <div className={'field col-12'}>
        <label htmlFor={'contentId'}>Conteúdo</label>
        <Dropdown
          options={contents.map((c) => ({
            label: `${c.title} - ${c.subject.title}`,
            value: c.id,
          }))}
          value={game.contentId}
          placeholder={'Selecione um conteúdo'}
          onChange={(e) => setGame({ ...game, contentId: e.target.value })}
        />
      </div>
      <div className={'field col-12'}>
        <label htmlFor={'qntQuestions'}>Quantidade de questões</label>
        <InputNumber
          showButtons
          placeholder={'Ex.: 5'}
          min={1}
          value={game.qntQuestions}
          onValueChange={(e) =>
            setGame({ ...game, qntQuestions: Number(e.value) })
          }
        />
      </div>

      <div className={'field col-12'}>
        <Button label={'Gerar'} onClick={generateGame} />
      </div>
    </Dialog>
  );
};

export default CreateGameDialog;
