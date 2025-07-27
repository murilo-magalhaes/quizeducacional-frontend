'use client';

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import useToastContext from '@/hooks/toast';
import { emptyPlayer, Player } from '@/interfaces/player.interface';
import { emptySubject, Subject } from '@/interfaces/subject.interface';
import { Content, emptyContent } from '@/interfaces/content.interface';
import {
  ELevel,
  emptyQuestion,
  Question,
  TLevel,
} from '@/interfaces/question.interface';
import {
  Alternative,
  emptyAlternative,
} from '@/interfaces/alternative.interface';
import { api } from '@/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import CreateGameDialog from '@/components/game/dialog-create';
import { emptyGame, Game } from '@/interfaces/game.interface';
import { InputSwitch } from 'primereact/inputswitch';
import { mockGames } from '@/mock/game.mock';
import GameCard from '@/components/game/card';
import { Divider } from 'primereact/divider';
import {
  emptyGameQuestion,
  GameQuestion,
} from '@/interfaces/gameQuestion.interface';

export default function HomePage() {
  const toast = useToastContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [subjectsDialogOpen, setSubjectsDialogOpen] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subject, setSubject] = useState<Subject>(emptySubject);
  const [contentsDialogOpen, setContentsDialogOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [content, setContent] = useState<Content>(emptyContent);

  const [questionsDialogOpen, setQuestionsDialogOpen] =
    useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>(emptyQuestion);

  const [alternativesDialogOpen, setAlternativesDialogOpen] =
    useState<boolean>(false);
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [alternative, setAlternative] = useState<Alternative>(emptyAlternative);

  const [generateGameDialogOpen, setGenerateGameDialogOpen] =
    useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [game, setGame] = useState<Game>(emptyGame);
  const [gameDialogOpen, setGameDialogOpen] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<GameQuestion>(emptyGameQuestion);

  const [player, setPlayer] = useState<Player>(emptyPlayer);

  useEffect(() => {
    loadContents().then();
    const player = JSON.parse(localStorage.getItem('player') || '');
    setPlayer(player);
  }, []);

  useEffect(() => {
    setGames(
      mockGames
        .map((game) => ({
          ...game,
          content:
            contents.find((c) => c.id === game.contentId) || emptyContent,
        }))
        .sort((a, b) => a.id - b.id),
    );
  }, [contents]);

  useEffect(() => {
    if (!alternative.correct)
      setAlternative({ ...alternative, correctToQuestionId: 0 });
  }, [alternative.correct]);

  useEffect(() => {
    if (!alternative.forDoubt)
      setAlternative({ ...alternative, forDoubtToQuestionId: 0 });
  }, [alternative.forDoubt]);

  const createSubject = async () => {
    setIsLoading(true);
    api
      .post(`/subjects`, {
        title: subject.title,
      })
      .then((res) => {
        console.log(res);
        loadSubjects().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loadSubjects = async () => {
    setIsLoading(true);
    api
      .get(`/subjects`)
      .then((res) => {
        console.log(res);
        setSubjects(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteSubject = async (id: number) => {
    setIsLoading(true);
    api
      .delete(`/subjects/${id}`)
      .then((res) => {
        console.log(res);
        loadSubjects().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const createContent = async () => {
    setIsLoading(true);
    api
      .post(`/contents`, {
        title: content.title,
        subjectId: content.subjectId,
      })
      .then((res) => {
        console.log(res);
        loadContents().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

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

  const deleteContent = async (id: number) => {
    setIsLoading(true);
    api
      .delete(`/contents/${id}`)
      .then((res) => {
        console.log(res);
        loadContents().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const createQuestion = async () => {
    setIsLoading(true);
    api
      .post(`/questions`, {
        statement: question.statement,
        contentId: question.contentId,
        level: question.level,
      })
      .then((res) => {
        console.log(res);
        loadQuestions().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loadQuestions = async () => {
    setIsLoading(true);
    api
      .get(`/questions`)
      .then((res) => {
        console.log(res);
        setQuestions(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteQuestion = async (id: number) => {
    setIsLoading(true);
    api
      .delete(`/questions/${id}`)
      .then((res) => {
        console.log(res);
        loadQuestions().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const createAlternative = async () => {
    setIsLoading(true);
    api
      .post(`/alternatives`, {
        alternativeText: alternative.alternativeText,
        contentId: alternative.contentId,
        correct: alternative.correct,
        correctToQuestionId: alternative.correctToQuestionId,
        forDoubt: alternative.forDoubt,
        forDoubtToQuestionId: alternative.forDoubtToQuestionId,
      })
      .then((res) => {
        console.log(res);
        loadAlternatives().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loadAlternatives = async () => {
    setIsLoading(true);
    api
      .get(`/alternatives`)
      .then((res) => {
        console.log(res);
        setAlternatives(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteAlternative = async (id: number) => {
    setIsLoading(true);
    api
      .delete(`/alternatives/${id}`)
      .then((res) => {
        console.log(res);
        loadAlternatives().then();
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const loadGames = async () => {
    setIsLoading(true);
    api
      .get(`/games`)
      .then((res) => {
        console.log(res);
        setGames(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        toast('error', 'Erro', err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const findCurrentQuestion = (game: Game) => {
    if (game.playersAnswers.length === 0) {
      setCurrentQuestion(game.questions[0]);
    }
  };

  const handleOpenGameDialog = (game: Game) => {
    setGameDialogOpen(true);
    setGame(game);
    findCurrentQuestion(game);
  };

  const handleCloseGameDialog = () => {
    setGameDialogOpen(false);
    setGame(emptyGame);
  };

  const renderDeleteButton = (entity: string, id: number) => {
    return (
      <Button
        key={id}
        onClick={() => {
          switch (entity) {
            case 'subjects':
              deleteSubject(id).then();
              break;
            case 'contents':
              deleteContent(id).then();
              break;
            case 'questions':
              deleteQuestion(id).then();
              break;
            case 'alternatives':
              deleteAlternative(id).then();
              break;
            default:
              break;
          }
        }}
        severity="danger"
        icon={'pi pi-trash'}
      />
    );
  };

  const renderColumnLevel = (level: ELevel) => TLevel[level];

  return (
    <main className={'px-8'}>
      <div className={'flex w-full'}>
        <div className="w-10 flex flex-wrap gap-2">
          <Button
            label="Disciplinas"
            type={'button'}
            onClick={async () => {
              setSubjectsDialogOpen(true);
              loadSubjects().then();
            }}
          />
          <Button
            label="Conteúdos"
            type={'button'}
            onClick={async () => {
              setContentsDialogOpen(true);
              loadContents().then();
              loadSubjects().then();
            }}
          />
          <Button
            label="Questões"
            type={'button'}
            onClick={async () => {
              setQuestionsDialogOpen(true);
              loadContents().then();
              loadQuestions().then();
            }}
          />
          <Button
            label="Alternativas"
            type={'button'}
            onClick={async () => {
              setAlternativesDialogOpen(true);
              loadContents().then();
              loadQuestions().then();
              loadAlternatives().then();
            }}
          />
        </div>
        <div className={'w-2 flex align-items-center justify-content-center'}>
          <span>
            <b>Jogador: </b>
            {player.name}
          </span>
        </div>
      </div>

      <div className={'mt-6'}>
        <Button
          label={'Gerar novo jogo'}
          className={'p-button-outlined'}
          onClick={() => setGenerateGameDialogOpen(true)}
        />

        <CreateGameDialog
          visible={generateGameDialogOpen}
          onClose={async () => {
            setGenerateGameDialogOpen(false);
            loadGames().then();
          }}
        />
      </div>

      <div className={'w-full mt-6 grid gap-2'}>
        {games.map((game) => (
          <div key={game.id} className={'col-4'}>
            <GameCard
              game={game}
              onStartGame={() => handleOpenGameDialog(game)}
            />
          </div>
        ))}
      </div>

      <Dialog
        className={'border-primary w-8'}
        onHide={() => setSubjectsDialogOpen(false)}
        visible={subjectsDialogOpen}
        header={'Disciplinas'}
      >
        <div className={'p-fluid grid formgrid'}>
          <div className={'field col-12'}>
            <label htmlFor={'title'}>Título</label>
            <InputText
              name={'title'}
              value={subject.title}
              onChange={(e) =>
                setSubject({ ...subject, title: e.target.value })
              }
              placeholder={'Ex.: Geografia...'}
            />
          </div>
          <div className={'field col-12'}>
            <Button
              label={'Nova disciplina'}
              icon={'pi pi-plus'}
              type={'button'}
              onClick={createSubject}
            />
          </div>
        </div>

        <DataTable
          value={subjects}
          emptyMessage={'Nenhuma disciplina encontrada'}
        >
          <Column header={'ID'} field={'id'} sortable></Column>
          <Column sortable header={'Título'} field={'title'}></Column>
          <Column
            align={'right'}
            header={'*'}
            body={(r) => renderDeleteButton('subjects', r.id)}
          ></Column>
        </DataTable>
      </Dialog>

      <Dialog
        className={'border-primary w-8'}
        onHide={() => setContentsDialogOpen(false)}
        visible={contentsDialogOpen}
        header={'Conteúdos'}
      >
        <div className={'p-fluid grid formgrid'}>
          <div className={'field col-12'}>
            <label htmlFor={'subjectId'}>Disciplina</label>
            <Dropdown
              options={subjects.map((s) => ({ label: s.title, value: s.id }))}
              value={content.subjectId}
              placeholder={'Selecione uma disciplina'}
              onChange={(e) =>
                setContent({ ...content, subjectId: e.target.value })
              }
            />
          </div>
          <div className={'field col-12'}>
            <label htmlFor={'title'}>Título</label>
            <InputText
              name={'title'}
              value={content.title}
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
              placeholder={'Ex.: Biomas...'}
            />
          </div>
          <div className={'field col-12'}>
            <Button
              label={'Novo conteúdo'}
              icon={'pi pi-plus'}
              type={'button'}
              onClick={createContent}
            />
          </div>
        </div>

        <DataTable value={contents} emptyMessage={'Nenhum conteúdo encontrado'}>
          <Column header={'ID'} field={'id'} sortable></Column>
          <Column sortable header={'Título'} field={'title'}></Column>
          <Column
            sortable
            header={'Disciplina'}
            field={'subject.title'}
          ></Column>
          <Column
            align={'right'}
            header={'*'}
            body={(r) => renderDeleteButton('contents', r.id)}
          ></Column>
        </DataTable>
      </Dialog>

      <Dialog
        className={'border-primary w-8'}
        onHide={() => setQuestionsDialogOpen(false)}
        visible={questionsDialogOpen}
        header={'Questões'}
      >
        <div className={'p-fluid grid formgrid'}>
          <div className={'field col-12'}>
            <label htmlFor={'contentId'}>Conteúdo</label>
            <Dropdown
              options={contents.map((c) => ({
                label: `${c.title} - ${c.subject.title}`,
                value: c.id,
              }))}
              value={question.contentId}
              placeholder={'Selecione um conteúdo'}
              onChange={(e) =>
                setQuestion({ ...question, contentId: e.target.value })
              }
            />
          </div>
          <div className={'field col-12'}>
            <label htmlFor={'statement'}>Enunciado</label>
            <InputTextarea
              name={'statement'}
              value={question.statement}
              onChange={(e) =>
                setQuestion({ ...question, statement: e.target.value })
              }
              placeholder={
                'Ex.: Qual é o bioma predominante no estado de Goiás?...'
              }
            />
          </div>
          <div className={'field col-12'}>
            <label htmlFor={'level'}>Nível de dificuldade</label>
            <SelectButton
              value={question.level}
              options={[
                { label: 'Fácil', value: 'EASY' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Difícil', value: 'HARD' },
              ]}
              onChange={(e) =>
                setQuestion({ ...question, level: e.target.value })
              }
            />
          </div>
          <div className={'field col-12 mt-4'}>
            <Button
              label={'Nova questão'}
              icon={'pi pi-plus'}
              type={'button'}
              onClick={createQuestion}
            />
          </div>
        </div>

        <DataTable
          value={questions}
          emptyMessage={'Nenhuma questão encontrada'}
        >
          <Column header={'ID'} field={'id'} sortable></Column>
          <Column sortable header={'Enunciado'} field={'statement'}></Column>
          <Column
            sortable
            header={'Disciplina'}
            field={'content.subject.title'}
          ></Column>
          <Column sortable header={'Conteúdo'} field={'content.title'}></Column>
          <Column
            sortable
            header={'Nível'}
            body={(r) => renderColumnLevel(r.level)}
          ></Column>
          <Column
            align={'right'}
            header={'*'}
            body={(r) => renderDeleteButton('questions', r.id)}
          ></Column>
        </DataTable>
      </Dialog>
      <Dialog
        className={'border-primary w-8'}
        onHide={() => setAlternativesDialogOpen(false)}
        visible={alternativesDialogOpen}
        header={'Alternativas'}
      >
        <div className={'p-fluid grid formgrid'}>
          <div className={'field col-12'}>
            <label htmlFor={'contentId'}>Conteúdo</label>
            <Dropdown
              options={contents.map((c) => ({
                label: `${c.title} - ${c.subject.title}`,
                value: c.id,
              }))}
              value={alternative.contentId}
              placeholder={'Selecione um conteúdo'}
              onChange={(e) =>
                setAlternative({ ...alternative, contentId: e.target.value })
              }
            />
          </div>
          <div className={'field col-12'}>
            <label htmlFor={'alternativeText'}>Alternativa</label>
            <InputTextarea
              name={'alternativeText'}
              value={alternative.alternativeText}
              onChange={(e) =>
                setAlternative({
                  ...alternative,
                  alternativeText: e.target.value,
                })
              }
              placeholder={'Ex.: Cerrado...'}
            />
          </div>
          <div
            className={'field col-2 flex align-items-center flex-column gap-2'}
          >
            <label htmlFor={'correct'}>É correta?</label>
            <InputSwitch
              checked={alternative.correct}
              onChange={(e) =>
                setAlternative({ ...alternative, correct: e.target.value })
              }
            />
          </div>
          <div className={'field col-10'}>
            <label htmlFor={'correctToQuestionId'}>Para qual questão?</label>
            <Dropdown
              name={'correctToQuestionId'}
              emptyMessage={
                'Nenhuma questão encontrada para o conteúdo selecionado'
              }
              disabled={!alternative.correct}
              options={questions
                .filter((q) => q.contentId === alternative.contentId)
                .map((q) => ({
                  label: q.statement,
                  value: q.id,
                }))}
              value={alternative.correctToQuestionId}
              placeholder={'Selecione uma questão'}
              onChange={(e) =>
                setAlternative({
                  ...alternative,
                  correctToQuestionId: e.target.value,
                })
              }
            />
          </div>
          <div
            className={'field col-2 flex align-items-center flex-column gap-2'}
          >
            <label htmlFor={'forDoubt'}>Gerar dúvida?</label>
            <InputSwitch
              checked={alternative.forDoubt}
              onChange={(e) =>
                setAlternative({ ...alternative, forDoubt: e.target.value })
              }
            />
          </div>
          <div className={'field col-10'}>
            <label htmlFor={'forDoubtToQuestionId'}>Para qual questão?</label>
            <Dropdown
              emptyMessage={
                'Nenhuma questão encontrada para o conteúdo selecionado'
              }
              name={'forDoubtToQuestionId'}
              disabled={!alternative.forDoubt}
              options={questions
                .filter((q) => q.contentId === alternative.contentId)
                .map((q) => ({
                  label: q.statement,
                  value: q.id,
                }))}
              value={alternative.forDoubtToQuestionId}
              placeholder={'Selecione uma questão'}
              onChange={(e) =>
                setAlternative({
                  ...alternative,
                  forDoubtToQuestionId: e.target.value,
                })
              }
            />
          </div>
          <div className={'field col-12 mt-4'}>
            <Button
              label={'Nova alternativa'}
              icon={'pi pi-plus'}
              type={'button'}
              onClick={createAlternative}
            />
          </div>
        </div>

        <p>Alternativas cadastradas:</p>

        <DataTable
          value={alternatives}
          emptyMessage={'Nenhuma alternativa encontrada'}
        >
          <Column header={'ID'} field={'id'} sortable></Column>
          <Column sortable field={'alternativeText'} header={'Texto'}></Column>
          <Column
            sortable
            header={'Disciplina'}
            field={'content.subject.title'}
          ></Column>
          <Column sortable header={'Conteúdo'} field={'content.title'}></Column>
          <Column
            align={'right'}
            header={'*'}
            body={(r) => renderDeleteButton('alternatives', r.id)}
          ></Column>
        </DataTable>
      </Dialog>

      <Dialog
        className={'border-primary w-8'}
        visible={gameDialogOpen}
        onHide={() => handleCloseGameDialog()}
        header={`Jogo ${game.id}`}
      >
        <div className={'p-fluid grid formgrid'}>
          <div className={'col-6'}>
            <p>Disciplina: {game.content.subject.title}</p>
          </div>
          <div className={'col-6'}>
            <p>Conteúdo: {game.content.title}</p>
          </div>

          <Divider />
          <div className={'col-12'}>
            <label>Pergunta {currentQuestion?.position}:</label>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
