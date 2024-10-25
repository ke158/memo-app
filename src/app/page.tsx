'use client';

import type { Memo } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import apiClient from './client/api-client';

type InputMemoProps = {
  title: string;
};

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [newMemoTitle, setNewMemoTitle] = useState<string>('');

  const getMemos = useCallback(async () => {
    const res = await apiClient.get<{ memos: Memo[] }>('/memo');
    setMemos(res.memos);
  }, []);

  useEffect(() => {
    getMemos();
  }, [getMemos]);

  const postMemo = async (title: InputMemoProps) => {
    const res = await apiClient.post<{ newMemo: Memo }, InputMemoProps>(
      '/memo',
      title,
    ); // レスポンスとリクエストの型を指定
    setMemos(prevMemos => [...prevMemos, res.newMemo]);
    alert('メモを作成しました');
  };

  const putMemo = async (id: string) => {
    const title = prompt('新しいタイトルを入力してください');
    if (title) {
      const res = await apiClient.put<{ updateMemo: Memo }, { title: string }>(
        `/memo/${id}`,
        { title },
      );
      setMemos(memos.map(memo => (memo.id === id ? res.updateMemo : memo)));
      alert('メモを更新しました');
    }
  };

  const deleteMemo = async (id: string) => {
    if (window.confirm('本当に削除しますか？')) {
      await apiClient.delete<void>(`/memo/${id}`);
      setMemos(memos.filter(memo => memo.id !== id));
      alert('メモを削除しました');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postMemo({ title: newMemoTitle });
    setNewMemoTitle('');
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-[80%] space-y-3'>
        <form onSubmit={handleSubmit} method='post'>
          <div className='flex'>
            <input
              type='text'
              name='memo'
              placeholder='メモの追加'
              value={newMemoTitle}
              onChange={e => setNewMemoTitle(e.target.value)}
              className='border-2 border-gray-300 w-full py-1 px-2 rounded-md text-black'
            />
            <button type='submit' className='border-2 px-1'>
              追加
            </button>
          </div>
        </form>
        {memos?.map(memo => (
          <div
            key={memo?.id}
            className='flex items-center justify-between border-2 border-gray-300 py-1 px-2 rounded-md'
          >
            <div className='space-x-3'>
              <label htmlFor='memo-data' className='text-lg font-bold'>
                {memo?.title}
              </label>
              <span className='text-gray-500 text-sm'>
                {new Date(memo?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className='space-x-3'>
              <button
                type='button'
                className='border-2 px-1'
                onClick={() => putMemo(memo?.id)}
              >
                編集
              </button>
              <button
                type='button'
                className='border-2 px-1'
                onClick={() => deleteMemo(memo?.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
