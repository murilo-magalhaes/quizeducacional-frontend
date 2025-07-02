import React, {useState} from "react";
import {emptyGame, Game} from "@/interfaces/game.interface";
import {api} from "@/api";
import useToastContext from "@/hooks/toast";
import {Dialog} from "primereact/dialog";

export interface DialogProps {
    visible: boolean;
    onClose: () => void;
}

const CreateGameDialog: React.FC<DialogProps> = (props: DialogProps) => {

    const toast = useToastContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [game, setGame] = useState<Game>(emptyGame);


    const createQuestion = async () => {
        setIsLoading(true);
        api.post(`/games/generate`, {
            qntQuestions: game.qntQuestions,
            contentId: game.contentId
        })
            .then(res => {
                console.log(res);
                toast('success', 'Sucesso', 'Novo jogo gerado com sucesso!');
            })
            .catch(err => {
                console.error(err);
                toast('error', 'Erro', err.response.data.message);
            }).finally(() => setIsLoading(false));
    }

    return <Dialog className={'border-primary'} visible={props.visible} onHide={props.onClose} header={'Criar novo jogo'}></Dialog>

}

export default CreateGameDialog;