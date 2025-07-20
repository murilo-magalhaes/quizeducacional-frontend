'use client'

import { Card } from "primereact/card";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { api } from "@/api";
import useToastContext from "@/hooks/toast";
import {useRouter} from "next/navigation";

export default function Home() {
    const toast = useToastContext();
    const router = useRouter();

    const [name, setName] = useState<string>('');

    const handleSubmit = async (isLogin: boolean) => {
        if (!name.trim()) {
            toast('warn', 'Atenção', 'Digite um nome válido.');
            return;
        }

        if (isLogin) {
            // Login
            api.get(`/players/name/${encodeURIComponent(name)}`)
                .then(res => {
                    console.log(res);
                    toast('success', 'Sucesso', 'Login realizado com sucesso!');
                    localStorage.setItem('player', JSON.stringify(res.data));
                    router.push('/home');
                })
                .catch(err => {
                    console.error(err);
                    toast('error', 'Erro', err.response.data.message);
                });
        } else {
            // Criar
            api.post('/players', { name })
                .then(res => {
                    console.log(res);
                    toast('success', 'Sucesso', 'Jogador criado com sucesso!');
                    localStorage.setItem('player', JSON.stringify(res.data));
                    router.push('/home');
                })
                .catch(err => {
                    console.error(err);
                    toast('error', 'Erro', err.response.data.message);
                });
        }
    };

    const footer = () => (
        <div className="flex gap-2">
            <Button
                className="w-full p-button-outlined"
                label="Criar novo jogador"
                onClick={() => {
                    handleSubmit(false).then();
                }}
            />
            <Button
                className="w-full"
                label="Entrar"
                onClick={() => {
                    handleSubmit(true).then();
                }}
            />
        </div>
    );

    return (
        <main>
            <div className="flex justify-content-center">
                <Card footer={footer} className="w-3 px-2 py-4">
                    <div className="p-fluid grid formgrid mb-0">
                        <div className="field col-12">
                            <label htmlFor="name" className="text-center w-full mb-4">
                                Nome de jogador
                            </label>
                            <InputText
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nickname..."
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
