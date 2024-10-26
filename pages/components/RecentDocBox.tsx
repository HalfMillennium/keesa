import React from 'react';
import styled from 'styled-components/native';
import { COLORS } from './common';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const WorkSansText = styled.Text`
  font-family: Work Sans;
  color: ${COLORS.text};
`;

const UnstyledJotBox: React.FC<JotBoxProps> = ({
  title,
  description,
  createdDate,
}) => {
  return (
    <View
      style={{
        gap: 10,
        marginBottom: 20,
        borderColor: COLORS.lightGray + '50',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <WorkSansText style={{ fontSize: 20, width: '75%', fontWeight: 600 }}>
          {title}
        </WorkSansText>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <AntDesign name="calendar" color={COLORS.text}/>
          <WorkSansText style={{ fontWeight: 300, fontSize: 12 }}>
            {createdDate}
          </WorkSansText>
        </View>
      </View>
      <WorkSansText style={{ opacity: 0.7 }}>{description}</WorkSansText>
    </View>
  );
};

export const RecentJotBox = styled(UnstyledJotBox)`
  border-color: ${COLORS.recentJot};
  border-width: '2px';
  height: 60px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

interface JotBoxProps {
  title: string;
  description: string;
  createdDate: string;
}
