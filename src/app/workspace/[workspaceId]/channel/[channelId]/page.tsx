"use client";

import { MessageList } from '@/components/message-list';
import { useGetChannel } from '@/features/channels/api/use-get-channel';
import { useGetMessages } from '@/features/messages/api/use-get-messages';
import { useChannelId } from '@/hooks/use-channel-id';
import { Loader, TriangleAlert } from 'lucide-react';
import { ChatInput } from './chat-input';
import { Header } from './header';

const ChannelIdPage = () => {

    const channelId = useChannelId();

    const {results, status, loadMore} = useGetMessages({channelId});
    const { data: channel, isLoading: channelLoading } = useGetChannel({id: channelId});


    if (channelLoading || status === "LoadingFirstPage"){
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className='animate-spin size-6 text-muted-foreground'/>
            </div>
        );
    }

    if ( !channel){
        return (
            <div className="h-full flex-1 flex items-center justify-center gap-y-2">
                <TriangleAlert className='animate-pulse size-6 text-muted-foreground'/>
                <span className='text-sm text-muted-foreground'>Channel not found</span>
            </div>
        );
    }

  return (
    <div className="flex flex-col h-full">
        <Header title={channel.name}/>
        <div>
            
        </div>
        <MessageList
            channelName= {channel.name}
            channelCreationTime={channel._creationTime}
            data={results}
            loadMore={loadMore}
            isLoadingMore={status === "LoadingMore"}
            canLoadMore={status === "CanLoadMore"}

        />

        
            <ChatInput placeholder={`Message #${channel.name}`}/>
        
    </div>
  )
}

export default ChannelIdPage